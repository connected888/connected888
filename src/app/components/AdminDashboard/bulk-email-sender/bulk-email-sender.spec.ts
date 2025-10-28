import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkEmailSender } from './bulk-email-sender';

describe('BulkEmailSender', () => {
  let component: BulkEmailSender;
  let fixture: ComponentFixture<BulkEmailSender>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BulkEmailSender]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkEmailSender);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
