-- Table to store responses
CREATE TABLE responses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table to store items related to each response
CREATE TABLE items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_value INT NOT NULL, -- Store item as integer (e.g., 1, 2)
    response_id INT NOT NULL,
    FOREIGN KEY (response_id) REFERENCES responses(id)
);

-- Table to store combinations with links to responses
CREATE TABLE combinations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    combination_value VARCHAR(100) NOT NULL, -- Store as comma-separated values like "1,2"
    response_id INT NOT NULL,
    FOREIGN KEY (response_id) REFERENCES responses(id)
);

-- Table to link combinations to items in a many-to-many relationship
CREATE TABLE combination_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    combination_id INT NOT NULL,
    item_id INT NOT NULL,
    FOREIGN KEY (combination_id) REFERENCES combinations(id),
    FOREIGN KEY (item_id) REFERENCES items(id)
);
