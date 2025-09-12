import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Promote } from './promote';

describe('Promote', () => {
  let component: Promote;
  let fixture: ComponentFixture<Promote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Promote]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Promote);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
