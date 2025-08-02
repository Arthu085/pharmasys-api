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

CREATE TABLE company_type_rel (
    company_id INT NOT NULL,
    company_type_id INT NOT NULL,
    PRIMARY KEY (company_id, company_type_id),
    FOREIGN KEY (company_id) REFERENCES company(id),
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
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    status VARCHAR(10) DEFAULT 'ativo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ,
    FOREIGN KEY (role_id) REFERENCES role(id)
);

-- === PRESCRITOR ===

CREATE TABLE advice (
    id SERIAL PRIMARY KEY,
    acronym VARCHAR(10) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL
);

CREATE TABLE prescriptor (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    registration_number VARCHAR(30) NOT NULL,
    advice_id INT NOT NULL,
    specialty VARCHAR(150),
    state CHAR(2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT NOT NULL,
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
    unit_price NUMERIC(12,4) NOT NULL,
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
    notes TEXT NOT NULL,
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
    user_id INT NOT NULL,
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
('Medicamento'), ('Fórmulas/Leites'), ('Material Médico');

INSERT INTO subtype (name, type_id) VALUES 
('Básico', 1), 
('Antimicrobiano', 1), 
('Psicotrópico', 1);

INSERT INTO presentation (name) VALUES 
('Comprimido'), ('Cápsula'), ('Frasco'), ('Bisnaga'), 
('Unidade'), ('Lata'), ('Ampola'), ('Caneta');

INSERT INTO dosage (format) VALUES 
('x mg'), ('x mcg'), ('x mg/ml'), ('x mg/g'), ('x ui/ml'), ('x g');

INSERT INTO company_type (name) VALUES 
('Fornecedor'), ('Fabricante');

INSERT INTO stock_location (name, code, is_central_stock) VALUES 
('Estoque Central', 'CAF', true);

INSERT INTO advice (acronym, full_name) VALUES
('CRM', 'Conselho Regional de Medicina'),
('CRO', 'Conselho Regional de Odontologia'),
('COREM', 'Conselho Regional de Técnicos em Radiologia'),
('CRMV', 'Conselho Regional de Medicina Veterinária'),
('CRF', 'Conselho Regional de Farmácia'),
('CRN', 'Conselho Regional de Nutrição');

INSERT INTO "role" (name) VALUES 
('ADMIN'),
('OPERADOR'),
('FARMACEUTICO');


-- === AJUSTES DE COLUNAS TEMPORAIS ===

ALTER TABLE transfer_request
ADD COLUMN editable_until TIMESTAMP DEFAULT (NOW() + INTERVAL '24 hours');

-- === CONSTRAINT PARA EVITAR ITENS REPETIDOS EM UMA DISPENSAÇÃO ===

ALTER TABLE item_dispensation_item
ADD CONSTRAINT unique_item_per_dispensation UNIQUE (item_dispensation_id, item_id);

-- === ÍNDICES PARA FILTROS FREQUENTES ===

CREATE INDEX idx_invoice_number ON inventory_entry(invoice_number);
CREATE INDEX idx_entry_date ON inventory_entry(entry_date);
CREATE INDEX idx_exit_date ON inventory_exit(exit_date);
CREATE INDEX idx_batch_code ON batch(batch_code);
CREATE INDEX idx_dispensation_date ON item_dispensation(dispensation_date);
CREATE INDEX idx_request_date ON transfer_request(request_date);
CREATE INDEX idx_transfer_status ON transfer_request(status);

-- === VIEW: Relatório de Itens Vencidos ===

CREATE OR REPLACE VIEW view_expired_items AS
SELECT
    i.name AS item_name,
    b.batch_code,
    b.expiration_date,
    sl.name AS stock_location,
    sb.quantity
FROM
    batch b
JOIN item i ON i.id = b.item_id
JOIN stock_balance sb ON sb.batch_id = b.id
JOIN stock_location sl ON sl.id = sb.stock_location_id
WHERE
    b.expiration_date < CURRENT_DATE;

-- === VIEW: Relatório de Dispensações ===

CREATE OR REPLACE VIEW view_dispensation_report AS
SELECT
    idd.id,
    p.name AS patient_name,
    p.document,
    pr.name AS prescriptor_name,
    idd.dispensation_date,
    i.name AS item_name,
    b.batch_code,
    b.expiration_date,
    idi.quantity,
    idi.is_psychotropic,
    idi.prescription_notification_number
FROM
    item_dispensation idd
JOIN patient p ON p.id = idd.patient_id
JOIN prescriptor pr ON pr.id = idd.prescriptor_id
JOIN item_dispensation_item idi ON idi.item_dispensation_id = idd.id
JOIN item i ON i.id = idi.item_id
JOIN batch b ON b.id = idi.batch_id;

-- === VIEW: Relatório de Pedidos de Transferência ===

CREATE OR REPLACE VIEW view_transfer_requests AS
SELECT
    tr.id,
    origin.name AS origin,
    dest.name AS destination,
    tr.request_date,
    tr.status,
    tr.reason,
    u.name AS requested_by
FROM
    transfer_request tr
JOIN stock_location origin ON origin.id = tr.origin_id
JOIN stock_location dest ON dest.id = tr.stock_location_id
JOIN "user" u ON u.id = tr.user_id;

-- === VIEW: Relatório de Movimentação de Estoque ===

CREATE OR REPLACE VIEW view_stock_movements AS
SELECT
    'entrada' AS movement_type,
    ie.entry_date AS date,
    i.name AS item_name,
    b.batch_code,
    b.expiration_date,
    ie.invoice_number,
    c.name AS supplier,
    sl.name AS location,
    iei.quantity,
    NULL AS patient,
    NULL AS prescriptor,
    NULL AS transfer_destination
FROM
    inventory_entry ie
JOIN inventory_entry_item iei ON iei.inventory_entry_id = ie.id
JOIN item i ON i.id = iei.item_id
JOIN batch b ON b.id = iei.batch_id
JOIN company c ON c.id = ie.company_id
JOIN stock_location sl ON sl.id = ie.stock_location_id

UNION ALL

SELECT
    'saida',
    ie.exit_date,
    i.name,
    b.batch_code,
    b.expiration_date,
    NULL,
    NULL,
    NULL,
    iei.quantity,
    NULL,
    NULL,
    NULL
FROM
    inventory_exit ie
JOIN inventory_exit_item iei ON iei.inventory_exit_id = ie.id
JOIN item i ON i.id = iei.item_id
JOIN batch b ON b.id = iei.batch_id

UNION ALL

SELECT
    'transferencia',
    st.transfer_date,
    i.name,
    b.batch_code,
    b.expiration_date,
    NULL,
    NULL,
    origin.name,
    sti.quantity,
    NULL,
    NULL,
    dest.name
FROM
    stock_transfer st
JOIN stock_transfer_item sti ON sti.stock_transfer_id = st.id
JOIN item i ON i.id = sti.item_id
JOIN batch b ON b.id = sti.batch_id
JOIN stock_location origin ON origin.id = st.origin_id
JOIN stock_location dest ON dest.id = st.destination_id

UNION ALL

SELECT
    'dispensacao',
    idd.dispensation_date,
    i.name,
    b.batch_code,
    b.expiration_date,
    NULL,
    NULL,
    NULL,
    idi.quantity,
    p.name,
    pr.name,
    NULL
FROM
    item_dispensation idd
JOIN item_dispensation_item idi ON idi.item_dispensation_id = idd.id
JOIN item i ON i.id = idi.item_id
JOIN batch b ON b.id = idi.batch_id
JOIN patient p ON p.id = idd.patient_id
JOIN prescriptor pr ON pr.id = idd.prescriptor_id;


ALTER TABLE item
ADD COLUMN user_id INT NOT NULL;

ALTER TABLE item
ADD FOREIGN KEY (user_id) REFERENCES "user"(id);

