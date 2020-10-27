import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PaginationComponent } from './pagination.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { envConfig, EnvironmentConfig } from 'src/app/_services/featureConfig/environmentConfig.service';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ PaginationComponent ],
      imports:[HttpClientTestingModule],
      providers: [{
        provide: APP_INITIALIZER,
        useFactory: envConfig,
        deps: [ EnvironmentConfig ],
        multi: true
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    // mock for a result set of 54 items returning 25 a page
    component.page = 0;
    component.total = 54;
    component.perPage = 25;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate min page', () => {
    expect(component.getMin()).toEqual(1);
  });

  it('should calculate max page', () => {
    expect(component.getMax()).toEqual(25);
  });

  it('should jump to page', () => {
    spyOn(component['goPage'], 'emit');
    component.onPage(2);
    expect(component['goPage'].emit).toHaveBeenCalledTimes(1);
  });

  it('should go to next page', () => {
    spyOn(component['goNext'], 'emit');
    component.onNext(true);
    expect(component['goNext'].emit).toHaveBeenCalledTimes(1);
  });

  it('should disable first button on our first page', () => {
    let element = fixture.debugElement.query(By.css('button.firstPage')).nativeElement;
    expect(element.getAttribute('disabled')).not.toBeNull();
  });

  it('should disable prev on our first page', () => {
    let element = fixture.debugElement.query(By.css('button.prevPage')).nativeElement;
    expect(element.getAttribute('disabled')).not.toBeNull();
  });

  it('should go to prev page', () => {
    spyOn(component['goPrev'], 'emit');
    component.onPrev();
    expect(component['goPrev'].emit).toHaveBeenCalledTimes(1);
  });

  it('should calculate total pages', () => {
    expect(component.totalPages()).toEqual(3);
  });

  it('should return whether its the last page', () => {
    expect(component.lastPage()).toEqual(false);
  });

  it('should get all pages', () => {
    expect(component.getPages()).toEqual([1,2,3]);
  });
});
