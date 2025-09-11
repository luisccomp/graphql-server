export type Category = {
  id: string;
  name: string;
  description?: string;
  courses?: Course[];
};

export type Course = {
  id: string;
  title: string;
  description?: string;
  category?: Category;
};

export type NewCategoryInput = {
  name: string;
  description?: string;
};

export type NewCourseInput = {
  title: string;
  description?: string;
  categoryId: string;
};
