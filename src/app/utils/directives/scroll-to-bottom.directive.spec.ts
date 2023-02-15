import { ElementRef, Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ScrollToBottomDirective } from './scroll-to-bottom.directive';

describe('ScrollToBottomDirective', () => {
  let renderer2: Renderer2;
  let mockElementRef: ElementRef = {
    nativeElement: document.createElement('div'),
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [{ provide: ElementRef, useClass: mockElementRef }, Renderer2],
    }).compileComponents();
  });

  it('should create an instance', () => {
    const directive = new ScrollToBottomDirective(mockElementRef, renderer2);
    expect(directive).toBeTruthy();
  });
});
