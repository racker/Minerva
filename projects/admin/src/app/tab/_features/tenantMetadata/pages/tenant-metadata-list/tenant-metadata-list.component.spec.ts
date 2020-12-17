import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantMetadataListComponent } from './tenant-metadata-list.component';

describe('TenantMetadataListComponent', () => {
  let component: TenantMetadataListComponent;
  let fixture: ComponentFixture<TenantMetadataListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantMetadataListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantMetadataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
