import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../models/get-category.model';
import { CategoryService } from '../services/category.service';


@Component({
  selector: 'app-update-category',
  standalone: false,
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css'
})
export class UpdateCategoryComponent implements OnInit{
  Id!: string;
  category: Category = { Id: '', Name: '', UrlHandle: '' };

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.Id = this.route.snapshot.paramMap.get('id')!;
    if (this.Id) {
      this.categoryService.getCategoryById(this.Id).subscribe({
        next: (data: any) => {
          this.category = data;
        },
        error: (err: any) => {
          console.error('Error fetching category:', err);
        }
      });
    }
  }

  updateCategory(): void {
    if (!this.category.Id || !this.category.Name || !this.category.UrlHandle) {
      alert('All fields are required!');
      return;
    }

    this.categoryService.updateCategory(this.category).subscribe({
      next: () => {
        console.log('Category updated successfully');
        this.router.navigate(['/admin/categories']);
      },
      error: (err) => {
        console.error('Error updating category:', err);
      }
    });
  }

}
