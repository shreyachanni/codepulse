import { Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  standalone: false,
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnDestroy {

  model: AddCategoryRequest; 
  private addCategorySubscription?: Subscription;

  constructor(private categoryService: CategoryService, private router: Router)
  {
    this.model = {
      Name: '',
      UrlHandle: ''
    };

  }


  onFormSubmit() {
    this.addCategorySubscription = this.categoryService.addCategory(this.model)
    .subscribe({
      next: (response) => {
        console.log('Category added successfully');
        this.router.navigate(['/admin/categories']);
      },

      error: (err) => {
        console.error('Error adding category:', err);
      }

    })
    
  }


  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }

}
