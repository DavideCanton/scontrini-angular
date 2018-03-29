import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeComponent, BadgeType } from './badge.component';
import { By } from '@angular/platform-browser';

describe('BadgeComponent', () => {
  let component: BadgeComponent;
  let fixture: ComponentFixture<BadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BadgeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display value', () => {
    component.value = '3';
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('span.badge'));
    const nativeElement: HTMLSpanElement = element.nativeElement;

    expect(nativeElement.textContent).toBe('3');
  });

  it('should have info class', () => {
    component.value = '3';
    component.type = 'info';
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('span.badge'));
    const nativeElement: HTMLSpanElement = element.nativeElement;

    expect(nativeElement.classList).toContain('info');
    expect(component.enumType).toBe(BadgeType.Info);
    expect(nativeElement.textContent).toBe('3');
  });

  it('should have info as default class', () => {
    component.value = '3';
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('span.badge'));
    const nativeElement: HTMLSpanElement = element.nativeElement;

    expect(nativeElement.classList).toContain('info');
    expect(component.enumType).toBe(BadgeType.Info);
    expect(nativeElement.textContent).toBe('3');
  });

  it('should have warning class', () => {
    component.value = '3';
    component.type = 'warning';
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('span.badge'));
    const nativeElement: HTMLSpanElement = element.nativeElement;

    expect(nativeElement.classList).toContain('warning');
    expect(component.enumType).toBe(BadgeType.Warning);
    expect(nativeElement.textContent).toBe('3');
  });


  it('should have error class', () => {
    component.value = '3';
    component.type = 'error';
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('span.badge'));
    const nativeElement: HTMLSpanElement = element.nativeElement;

    expect(nativeElement.classList).toContain('error');
    expect(component.enumType).toBe(BadgeType.Error);
    expect(nativeElement.textContent).toBe('3');
  });

  it('should throw with invalid type', () => {
    expect(function () {
      component.value = '3';
      component.type = 'invalid';
      fixture.detectChanges();
    }).toThrow(new Error('Invalid value invalid'));
  });
});
