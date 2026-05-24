import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Feast } from './feast';

describe('Feast', () => {
  let component: Feast;
  let fixture: ComponentFixture<Feast>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Feast],
    }).compileComponents();

    fixture = TestBed.createComponent(Feast);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
