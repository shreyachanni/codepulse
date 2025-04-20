import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-category',
  standalone: false,
  templateUrl: './delete-category.component.html',
  styleUrl: './delete-category.component.css'
})
export class DeleteCategoryComponent implements OnInit {
  Id!: string;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  //ngoninit lifecycle hook to get the category ID from the route parameters

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.Id = idParam;
      console.log('Category ID:', this.Id);
    } else {
      console.error('Category ID is missing in the URL');
      this.router.navigate(['/admin/categories']);
    }
  }

  deleteCategory(): void {
    if (!this.Id) {
      console.error('Invalid category ID:', this.Id);
      return;
    }

    if (confirm("Are you sure you want to delete this category?")) {
      console.log('Deleting category with ID:', this.Id);

      this.categoryService.deleteCategory(this.Id).subscribe({
        next: () => {
          console.log('Category deleted successfully');
          this.router.navigate(['/admin/categories']);
        },
        error: (err: any) => {
          console.error('Error deleting category:', err);
        }
      });
    }
  }
}
