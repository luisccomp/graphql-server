import { v4 } from 'uuid';
import { IMutationResolvers, IQueryResolvers } from './resolvers.types';
import { Category, Course } from './types';
import { Database } from 'sqlite3';
import { title } from 'process';
import { CategoryTable, CourseTable } from './database.types';

const db = new Database('./db.sqlite');

export const queryResolvers: IQueryResolvers = {
  categories: () => {
    return new Promise((resolve, reject) => {
      const categories: Category[] = [];

      db.prepare('SELECT * FROM categories').each<CategoryTable>(
        (err, row) => {
          if (err) {
            console.error(err);
            return;
          }

          categories.push({
            id: row.id,
            name: row.name,
            description: row.description,
          });
        },
        (err) => {
          if (err) {
            console.error(err);
            reject(err);
            return;
          }
          resolve(categories);
        },
      );
    });
  },

  courses: () => {
    return new Promise((resolve, reject) => {
      const courses: Course[] = [];

      db.prepare(
        `
      SELECT co.id, 
             co.title, 
             co.description, 
             co.category_id, 
             ca.name as category_name,
             ca.description as category_description
      FROM courses co
      JOIN categories ca ON co.category_id = ca.id
      `,
      ).each<CourseTable>(
        (err, row) => {
          if (err) {
            console.error(err);
            return;
          }

          console.log(row);

          courses.push({
            id: row.id,
            title: row.title,
            description: row.description,
            category: {
              id: row.category_id,
              name: row.category_name,
              description: row.category_description,
            },
          });
        },
        (err) => {
          if (err) {
            console.error(err);
            reject(err);
            return;
          }
          resolve(courses);
        },
      );
    });
  },
};

export const mutationResolvers: IMutationResolvers = {
  addCategory: (_input, args, _ctx, _info) => {
    const { name, description } = args.input;
    const id = v4();

    const stmt = db.prepare(
      'INSERT INTO categories (id, name, description) VALUES (?, ?, ?)',
    );
    stmt.run(id, name, description);
    stmt.finalize();

    return { id, name, description };
  },

  addCourse: (_input, args, _ctx, _info) => {
    const id = v4();
    const { title, description, categoryId } = args.input;

    const stmt = db.prepare(
      'INSERT INTO courses (id, title, description, category_id) VALUES (?, ?, ?, ?)',
    );
    stmt.run(id, title, description, categoryId);
    stmt.finalize();

    return { id, title, description, categoryId };
  },
};
