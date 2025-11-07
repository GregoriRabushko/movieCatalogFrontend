import {
  AfterViewInit,
  ApplicationRef,
  createComponent,
  Directive,
  effect,
  ElementRef,
  inject,
  input, OnDestroy,
  Renderer2
} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, take, throwError} from 'rxjs';
import {Skeleton} from 'primeng/skeleton';

@Directive({
  selector: '[appLoader]'
})
export class Loader implements AfterViewInit, OnDestroy {
  skeletonSize = input('50px');
  mediaSource = input<string | null>();
  private blobUrl!: string;
  private isDefaultImgUsed: boolean = false;
  private readonly http = inject(HttpClient);
  private readonly renderer = inject(Renderer2);
  private readonly appRef = inject(ApplicationRef);
  private readonly el = inject(ElementRef<HTMLImageElement | HTMLVideoElement>);

  constructor() {
    effect(() => {
      if (!this.mediaSource()) {
        if (this.el.nativeElement.tagName.toLowerCase() === 'video') {
          this.renderer.removeAttribute(this.el.nativeElement, 'src');
          this.renderer.setAttribute(this.el.nativeElement, 'poster', '/assets/img/poster.jpg');
        } else {
          this.renderer.setAttribute(this.el.nativeElement, 'src', '/assets/img/default-image.png');
        }
        return;
      }
      if (this.el.nativeElement.tagName.toLowerCase() === 'video') {
        this.renderer.setAttribute(this.el.nativeElement, 'poster', '');
      }
      this.renderer.setAttribute(this.el.nativeElement, 'src', this.mediaSource()!);
      this.revokeObjectURL();
      this.isDefaultImgUsed = false;
    });
  }

  ngAfterViewInit() {
    this.onLoading();
  }

  private revokeObjectURL() {
    URL.revokeObjectURL(this.blobUrl);
    this.blobUrl = '';
  }

  onLoading() {
    if (this.isDefaultImgUsed) return;
    const parent = this.el.nativeElement.parentElement;
    if (!parent) return;

    this.renderer.setStyle(this.el.nativeElement, 'display', 'none');

    const container = document.createElement('div');
    parent.appendChild(container);

    const skeletonRef = createComponent(Skeleton, {
      hostElement: container,
      environmentInjector: this.appRef.injector,
    });

    skeletonRef.instance.size = this.skeletonSize();
    skeletonRef.changeDetectorRef.detectChanges();


    this.http
      .get(this.el.nativeElement.src, { responseType: 'blob' })
      .pipe(
        take(1),
        catchError(error => {
          if (this.el.nativeElement.tagName.toLowerCase() === 'video') {
            this.renderer.removeAttribute(this.el.nativeElement, 'src');
            this.renderer.setAttribute(this.el.nativeElement, 'poster', '/assets/img/poster.jpg');
          } else {
            this.renderer.setAttribute(this.el.nativeElement, 'src', '/assets/img/default-image.png');
          }
          parent.removeChild(container);
          skeletonRef.destroy();
          this.renderer.setStyle(this.el.nativeElement, 'display', 'block');
          this.isDefaultImgUsed = true;
          return throwError(() => error);
        }),
      )
      .subscribe(blob => {
        const url = URL.createObjectURL(blob);
        this.blobUrl = url;
        this.renderer.setAttribute(this.el.nativeElement, 'src', url);

        parent.removeChild(container);
        skeletonRef.destroy();

        this.renderer.setStyle(this.el.nativeElement, 'display', 'block');
      });
  }

  ngOnDestroy(): void {
    this.revokeObjectURL();
  }
}
