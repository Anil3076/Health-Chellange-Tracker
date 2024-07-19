import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowChartsComponent } from './show-charts.component';


describe('ShowChartsComponent', () => {
  let component: ShowChartsComponent;
  let fixture: ComponentFixture<ShowChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: []
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('testing username',()=>{
    expect(component.userName).toBe("No Data Found")
  });
});


