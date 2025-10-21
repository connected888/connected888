import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationsList } from './registrations-list';

describe('RegistrationsList', () => {
  let component: RegistrationsList;
  let fixture: ComponentFixture<RegistrationsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
