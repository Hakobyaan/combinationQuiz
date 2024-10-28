CREATE TABLE items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(10) NOT NULL
);

-- Table to store combinations
CREATE TABLE combinations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    combination VARCHAR(100) NOT NULL
);

-- Table to store responses
CREATE TABLE responses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    combination_id INT,
    response_body TEXT,
    FOREIGN KEY (combination_id) REFERENCES combinations(id)
);
