package database

import (
	"database/sql"

	"github.com/google/uuid"
)

type Category struct {
	db *sql.DB

	ID          string
	Name        string
	Description string
}

func NewCategory(db *sql.DB) *Category {
	return &Category{
		db: db,
	}
}

func (c *Category) Create(name, description string) (Category, error) {
	id := uuid.New().String()

	_, err := c.db.Exec("INSERT INTO categories (id, name, description) VALUES (?, ?, ?)", id, name, description)

	// Em caso de erro, retornar uma categoria vazia e o erro
	if err != nil {
		return Category{}, err
	}

	return Category{
		ID:          id,
		Name:        name,
		Description: description,
	}, nil
}

func (c *Category) FindAll() ([]Category, error) {
	rows, err := c.db.Query("SELECT id, name, description FROM categories")

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	categories := []Category{}

	// De forma lazy, iterar sobre as linhas retornadas e escanear os dados em structs Category
	// Para cada dado encontrado, persistir no array de categorias
	for rows.Next() {
		var category Category
		if err := rows.Scan(&category.ID, &category.Name, &category.Description); err != nil {
			return nil, err
		}
		categories = append(categories, category)
	}

	return categories, nil
}

func (c *Category) FindByCourseID(courseID string) (Category, error) {
	var category Category
	query := `
		SELECT categories.id, categories.name, categories.description
		FROM categories
		INNER JOIN courses ON courses.category_id = categories.id
		WHERE courses.id = ?
	`
	err := c.db.QueryRow(query, courseID).Scan(&category.ID, &category.Name, &category.Description)
	if err != nil {
		return Category{}, err
	}
	return category, nil
}
