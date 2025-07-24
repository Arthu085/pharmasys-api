-- === TIPOS BÁSICOS ===
CREATE TABLE type (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE subtype (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type_id INT NOT NULL,
    FOREIGN KEY (type_id) REFERENCES type(id) ON DELETE CASCADE
);

CREATE TABLE presentation (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE dosage (
    id SERIAL PRIMARY KEY,
    format VARCHAR(100) NOT NULL
);

-- === ITEM ===
CREATE TABLE item (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type_id INT NOT NULL,
    presentation_id INT NOT NULL,
    dosage_id INT NOT NULL,
    subtype_id INT,
    FOREIGN KEY (type_id) REFERENCES type(id),
    FOREIGN KEY (presentation_id) REFERENCES presentation(id),
    FOREIGN KEY (dosage_id) REFERENCES dosage(id),
    FOREIGN KEY (subtype_id) REFERENCES subtype(id)
);

-- === PACIENTE ===
CREATE TABLE patient (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    document VARCHAR(14) NOT NULL UNIQUE  -- CPF
);

-- === EMPRESAS (FORNECEDOR/FABRICANTE) ===
CREATE TABLE company_type (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE company (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cnpj VARCHAR(18) NOT NULL UNIQUE,
    company_type_id INT NOT NULL,
    FOREIGN KEY (company_type_id) REFERENCES company_type(id)
);

-- === LOCAL DE ESTOQUE ===
CREATE TABLE stock_location (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    code VARCHAR(50) NOT NULL UNIQUE,
    is_central_stock BOOLEAN DEFAULT FALSE
);

-- === USUÁRIO E PERMISSÃO ===
CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_id INT,
    status VARCHAR(10) DEFAULT 'ativo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ,
    FOREIGN KEY (role_id) REFERENCES role(id)
);

-- === PRESCRITOR ===
CREATE TABLE advice (
    id SERIAL PRIMARY KEY,
    acronym VARCHAR(10) NOT NULL UNIQUE,
    full_name VARCHAR(100)
);

CREATE TABLE prescriptor (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    registration_number VARCHAR(30) NOT NULL,
    advice_id INT NOT NULL,
    specialty VARCHAR(150),
    state CHAR(2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT,
    FOREIGN KEY (advice_id) REFERENCES advice(id),
    FOREIGN KEY (user_id) REFERENCES "user"(id)
);

-- === LOTE ===
CREATE TABLE batch (
    id SERIAL PRIMARY KEY,
    item_id INT NOT NULL,
    batch_code VARCHAR(50) NOT NULL UNIQUE,
    expiration_date DATE,
    FOREIGN KEY (item_id) REFERENCES item(id)
);

-- === ESTOQUE ATUAL ===
CREATE TABLE stock_balance (
    item_id INT NOT NULL,
    batch_id INT NOT NULL,
    stock_location_id INT NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (item_id, batch_id, stock_location_id),
    FOREIGN KEY (item_id) REFERENCES item(id),
    FOREIGN KEY (batch_id) REFERENCES batch(id),
    FOREIGN KEY (stock_location_id) REFERENCES stock_location(id)
);

-- === ENTRADA DE ITENS ===
CREATE TABLE inventory_entry (
    id SERIAL PRIMARY KEY,
    invoice_number VARCHAR(50),
    issue_date DATE,
    entry_date TIMESTAMP DEFAULT NOW(),
    company_id INT NOT NULL,
    entry_type VARCHAR(50) NOT NULL CHECK (entry_type IN ('invoice', 'donation', 'stock_adjustment')),
    total_value NUMERIC(12,2),
    correction_deadline TIMESTAMP DEFAULT (NOW() + INTERVAL '24 hours'),
    stock_location_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (company_id) REFERENCES company(id),
    FOREIGN KEY (stock_location_id) REFERENCES stock_location(id),
    FOREIGN KEY (user_id) REFERENCES "user"(id)
);

CREATE TABLE inventory_entry_item (
    id SERIAL PRIMARY KEY,
    inventory_entry_id INT NOT NULL,
    item_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price NUMERIC(12,4),
    batch_id INT NOT NULL,
    FOREIGN KEY (inventory_entry_id) REFERENCES inventory_entry(id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES item(id),
    FOREIGN KEY (batch_id) REFERENCES batch(id)
);

-- === SAÍDA DE ITENS ===
CREATE TABLE inventory_exit (
    id SERIAL PRIMARY KEY,
    exit_type VARCHAR(50) NOT NULL CHECK (exit_type IN ('loss', 'stock_adjustment', 'expired', 'recall')),
    exit_date DATE DEFAULT CURRENT_DATE,
    notes TEXT,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "user"(id)
);

CREATE TABLE inventory_exit_item (
    id SERIAL PRIMARY KEY,
    inventory_exit_id INT NOT NULL,
    item_id INT NOT NULL,
    batch_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (inventory_exit_id) REFERENCES inventory_exit(id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES item(id),
    FOREIGN KEY (batch_id) REFERENCES batch(id)
);

-- === TRANSFERÊNCIA ENTRE ESTOQUES ===
CREATE TABLE stock_transfer (
    id SERIAL PRIMARY KEY,
    origin_id INT NOT NULL,
    destination_id INT NOT NULL,
    transfer_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT,
    FOREIGN KEY (origin_id) REFERENCES stock_location(id),
    FOREIGN KEY (destination_id) REFERENCES stock_location(id),
    FOREIGN KEY (user_id) REFERENCES "user"(id)
);

CREATE TABLE stock_transfer_item (
    id SERIAL PRIMARY KEY,
    stock_transfer_id INT NOT NULL,
    item_id INT NOT NULL,
    batch_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (stock_transfer_id) REFERENCES stock_transfer(id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES item(id),
    FOREIGN KEY (batch_id) REFERENCES batch(id)
);

-- === PEDIDO DE TRANSFERÊNCIA ===
CREATE TABLE transfer_request (
    id SERIAL PRIMARY KEY,
    stock_location_id INT NOT NULL, -- destino
    origin_id INT NOT NULL,         -- origem (CAF)
    request_date TIMESTAMP DEFAULT (NOW() + INTERVAL '24 hours'),
    reason VARCHAR(100) NOT NULL CHECK (reason IN ('resupply', 'loss', 'expired', 'recall')),
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'separating', 'approved', 'cancelled')),
    user_id INT NOT NULL,
    FOREIGN KEY (stock_location_id) REFERENCES stock_location(id),
    FOREIGN KEY (origin_id) REFERENCES stock_location(id),
    FOREIGN KEY (user_id) REFERENCES "user"(id)
);

CREATE TABLE transfer_request_item (
    id SERIAL PRIMARY KEY,
    transfer_request_id INT NOT NULL,
    item_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (transfer_request_id) REFERENCES transfer_request(id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES item(id)
);

-- === DISPENSAÇÃO DE ITENS ===
CREATE TABLE item_dispensation (
    id SERIAL PRIMARY KEY,
    patient_id INT NOT NULL,
    prescriptor_id INT NOT NULL,
    dispensation_date TIMESTAMP DEFAULT NOW(),
    user_id INT NOT NULL,
    FOREIGN KEY (patient_id) REFERENCES patient(id),
    FOREIGN KEY (prescriptor_id) REFERENCES prescriptor(id),
    FOREIGN KEY (user_id) REFERENCES "user"(id)
);

CREATE TABLE item_dispensation_item (
    id SERIAL PRIMARY KEY,
    item_dispensation_id INT NOT NULL,
    item_id INT NOT NULL,
    batch_id INT NOT NULL,
    quantity INT NOT NULL,
    is_psychotropic BOOLEAN DEFAULT FALSE,
    prescription_notification_number VARCHAR(50),
    FOREIGN KEY (item_dispensation_id) REFERENCES item_dispensation(id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES item(id),
    FOREIGN KEY (batch_id) REFERENCES batch(id)
);

-- === DADOS INICIAIS ===
INSERT INTO type (name) VALUES 
('medicamento'), ('fórmulas/leites'), ('material médico');

INSERT INTO subtype (name, type_id) VALUES 
('básico', 1), 
('antimicrobiano', 1), 
('psicotrópico', 1);

INSERT INTO presentation (name) VALUES 
('comprimido'), ('cápsula'), ('frasco'), ('bisnaga'), 
('unidade'), ('lata'), ('ampola'), ('caneta');

INSERT INTO dosage (format) VALUES 
('x mg'), ('x mcg'), ('x mg/ml'), ('x mg/g'), ('x ui/ml'), ('x g');
