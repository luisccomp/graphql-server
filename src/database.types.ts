export type CategoryTable = {
  id: string;
  name: string;
  description: string;
};

export type CourseTable = {
  id: string;
  title: string;
  description: string;
  category_id: string;
  category_name: string;
  category_description?: string;
};
