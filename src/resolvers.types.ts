import { GraphQLResolveInfo } from 'graphql';
import { Category, Course, NewCategoryInput, NewCourseInput } from './types';

export type IResolverInput<T> = {
  input: T;
};

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: IResolverInput<TArgs>,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export interface IResolver {}

export interface IQueryResolvers extends IResolver {
  categories: ResolverFn<Category[], {}, {}, {}>;
  courses: ResolverFn<Course[], {}, {}, {}>;
}

export interface IMutationResolvers extends IResolver {
  addCategory: ResolverFn<Category, {}, {}, NewCategoryInput>;
  addCourse: ResolverFn<Course, {}, {}, NewCourseInput>;
}
