import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Searchprofiles } from './searchprofiles';

describe('Searchprofiles', () => {
  let component: Searchprofiles;
  let fixture: ComponentFixture<Searchprofiles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Searchprofiles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Searchprofiles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
