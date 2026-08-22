import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { inject } from '@angular/core';

export interface NewMemoryPayload {
  readonly title?: string;
  readonly author?: string;
  readonly text: string;
  readonly imageFile?: File;
  readonly imagePreview?: string;
}

@Component({
  selector: 'app-new-memory',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './new-memory.html',
  styleUrl: './new-memory.scss'
})
export class NewMemory {
  private readonly formBuilder = inject(FormBuilder);

  readonly closed = output<void>();
  readonly submitted = output<NewMemoryPayload>();
  readonly selectedFile = signal<File | undefined>(undefined);
  readonly imagePreview = signal<string | undefined>(undefined);

  readonly memoryForm = this.formBuilder.nonNullable.group({
    text: ['', [Validators.required, Validators.maxLength(280)]],
    title: ['', [Validators.maxLength(80)]],
    author: ['', [Validators.maxLength(50)]]
  });

  get textLength(): number {
    return this.memoryForm.controls.text.value.length;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.selectedFile.set(file);
    this.imagePreview.set(URL.createObjectURL(file));
  }

  removeImage(): void {
    const preview = this.imagePreview();
    if (preview) URL.revokeObjectURL(preview);
    this.selectedFile.set(undefined);
    this.imagePreview.set(undefined);
  }

  submit(): void {
    if (this.memoryForm.invalid) {
      this.memoryForm.markAllAsTouched();
      return;
    }

    const values = this.memoryForm.getRawValue();
    this.submitted.emit({
      text: values.text.trim(),
      title: values.title.trim() || undefined,
      author: values.author.trim() || undefined,
      imageFile: this.selectedFile(),
      imagePreview: this.imagePreview()
    });
  }
}
