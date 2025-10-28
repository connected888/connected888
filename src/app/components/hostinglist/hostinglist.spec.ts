import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hostinglist } from './hostinglist';

describe('Hostinglist', () => {
  let component: Hostinglist;
  let fixture: ComponentFixture<Hostinglist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hostinglist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hostinglist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
