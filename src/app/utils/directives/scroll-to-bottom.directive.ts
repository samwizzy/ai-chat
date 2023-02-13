import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollToBottom]',
})
export class ScrollToBottomDirective {
  @HostListener('window:load') scrolling() {
    this.onWindowLoad();
  }

  constructor(private elem: ElementRef, private renderer: Renderer2) {}

  onWindowLoad() {
    this.renderer.setStyle(
      this.elem.nativeElement,
      'scrollTop',
      this.elem.nativeElement.scrollHeight
    );
  }
}
