import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteersList } from './volunteers-list';

describe('VolunteersList', () => {
  let component: VolunteersList;
  let fixture: ComponentFixture<VolunteersList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolunteersList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteersList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
