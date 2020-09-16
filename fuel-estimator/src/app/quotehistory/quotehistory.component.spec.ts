import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotehistoryComponent } from './quotehistory.component';

describe('QuotehistoryComponent', () => {
  let component: QuotehistoryComponent;
  let fixture: ComponentFixture<QuotehistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotehistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotehistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
