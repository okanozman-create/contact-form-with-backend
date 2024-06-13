CREATE DATABASE contact_form;
USE contact_form;

CREATE TABLE form_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  email VARCHAR(255),
  mobileNumber VARCHAR(255),
  birth DATE,
  password VARCHAR(255),
  selectedProduct VARCHAR(255),
  selectedGender VARCHAR(255),
  feedback TEXT,
  selectedCountry VARCHAR(255)
);

INSERT INTO form_data (firstName, lastName, email, mobileNumber, birth, password, selectedProduct, selectedGender, feedback, selectedCountry)
VALUES ('John', 'Doe', 'john.doe@example.com', '1234567890', '1990-01-01', 'password123', 'Product A', 'Male', 'Great service!', 'Country A');
