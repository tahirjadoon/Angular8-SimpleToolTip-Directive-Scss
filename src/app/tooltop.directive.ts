import { Directive, Input, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltopDirective {
  //title with alias to pass the property to the same name
  @Input('appTooltip') toolTiptitle: string;
  @Input() placement: string = "left";

  //span tag for the displaying tooltip
  elTooltip: HTMLElement;
  //offset
  offset: number = 10;
  //tooltip classes
  ngTooltipShowClass: string = "ng-tooltip-show";
  ngToolTipClass: string = "ng-tooltip";
  //position
  top: string = "top";
  left: string = "left";

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  //host listeners
  @HostListener('click') mouseclick(){
    this.showTooltip();
  }

  //this gets called twice, first inside and second outside when any button is clicked
  //when document is clicked then twice with <app-root, logs outside
  @HostListener('document:click', ['$event', '$event.target']) onclick(event: MouseEvent, targetElement: HTMLElement) {
    if (targetElement.getAttribute('appTooltip') === null){
      this.hideToolTip();
      return;
    }
    /*
    if (!targetElement) {
      return;
    }

    const clickedInside = this.el.nativeElement.contains(targetElement);
    if(!clickedInside){
      console.log("outside");
      this.hideToolTip();
    }
    else{
      console.log("inside");
    } 
    */ 
  }
  

  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    /*can do either way but the modern approach is following and not [const ESCAPE_KEYCODE = 27; if (event.keyCode === ESCAPE_KEYCODE)]*/
    if (event.key === "Escape" || event.key === "Esc") {
        this.hideToolTip();
    }
  }
  

  showTooltip(){
    //close any open tooltip
    this.hideToolTip();
    //create tooltip
    this.createTooltip();
    //set the position
    this.setPosition();
    //add the show class
    this.renderer.addClass(this.elTooltip, this.ngTooltipShowClass);
  }

  createTooltip(){
    //create the span tag 
    this.elTooltip = this.renderer.createElement('span');
    //append the title to the span
    this.renderer.appendChild(
      this.elTooltip, 
      this.renderer.createText(this.toolTiptitle) //text node
    ); 
    //append the span to the body
    this.renderer.appendChild(document.body, this.elTooltip);
    //add the class ngtooltip
    this.renderer.addClass(this.elTooltip, this.ngToolTipClass);
  }

  setPosition() {
    //clicked button
    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const hostTop = hostPos.top, hostLeft = hostPos.left, hostWidth = hostPos.width, hostHeight = hostPos.height;
    //span tooltip
    const tooltipPos = this.elTooltip.getBoundingClientRect();
    const tooltipHeight = tooltipPos.height, tooltipWidth = tooltipPos.width;
    //scroll position
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    //find left and right
    let dtop = hostTop, dleft = hostLeft;
    if (this.placement === this.top) {
      dtop = hostTop - tooltipHeight - this.offset;
      dleft = hostLeft + (hostWidth - tooltipWidth) / 2;
    }
    else if (this.placement === this.left) {
      dtop = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
      dleft = hostPos.left - tooltipPos.width - this.offset;
    }
    //apply top and left to span 
    this.renderer.setStyle(this.elTooltip, 'top', `${dtop + scrollPos}px`);
    this.renderer.setStyle(this.elTooltip, 'left', `${dleft}px`);
  }

  hideToolTip(){
    const toolTip = document.querySelector(`.${this.ngTooltipShowClass}`);
    if(toolTip != null){
      toolTip.remove();
      this.elTooltip = null;
    }
  }
}
