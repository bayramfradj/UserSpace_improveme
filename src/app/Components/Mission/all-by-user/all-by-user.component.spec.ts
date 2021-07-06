import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllByUserComponent } from './all-by-user.component';

describe('AllByUserComponent', () => {
  let component: AllByUserComponent;
  let fixture: ComponentFixture<AllByUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllByUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
