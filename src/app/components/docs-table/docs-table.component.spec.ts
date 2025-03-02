import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsTableComponent } from './docs-table.component';

describe('DocsTableComponent', () => {
  let component: DocsTableComponent;
  let fixture: ComponentFixture<DocsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
