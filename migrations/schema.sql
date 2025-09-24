-- Tabla de Empresas (Tenants)
    CREATE TABLE companies (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      created_at TIMESTAMPTZ DEFAULT now()
    );

    -- Tabla de Sedes/Locales
    CREATE TABLE locations (
      id SERIAL PRIMARY KEY,
      company_id INTEGER NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
      name VARCHAR(255) NOT NULL,
      address TEXT,
      created_at TIMESTAMPTZ DEFAULT now()
    );

    -- Tabla de Usuarios (Administradores y Operadoras)
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      company_id INTEGER NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
      google_id VARCHAR(255) UNIQUE,
      email VARCHAR(255) NOT NULL UNIQUE,
      name VARCHAR(255) NOT NULL,
      pin VARCHAR(255), -- Se guardará el hash del PIN
      role VARCHAR(50) NOT NULL, -- 'admin' o 'operator'
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMPTZ DEFAULT now()
    );

    -- Tabla de Pacientes
    CREATE TABLE patients (
      id SERIAL PRIMARY KEY,
      company_id INTEGER NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
      name VARCHAR(255) NOT NULL,
      document_number VARCHAR(50),
      date_of_birth DATE,
      occupation VARCHAR(255),
      created_at TIMESTAMPTZ DEFAULT now(),
      UNIQUE (company_id, document_number) -- El documento debe ser único por empresa
    );

    -- Tabla de Consultas
    CREATE TABLE consultations (
      id SERIAL PRIMARY KEY,
      patient_id INTEGER NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
      location_id INTEGER NOT NULL REFERENCES locations(id),
      user_id INTEGER NOT NULL REFERENCES users(id),
      consultation_date TIMESTAMPTZ NOT NULL,
      visit_reason TEXT,
      medical_conditions JSONB,
      habits JSONB,
      shoe_type VARCHAR(255),
      created_at TIMESTAMPTZ DEFAULT now()
    );

    -- Tabla de Fotos
     CREATE TABLE photos (
      id SERIAL PRIMARY KEY,
      consultation_id INTEGER NOT NULL REFERENCES consultations(id) ON DELETE CASCADE,
      storage_url TEXT NOT NULL, -- URL de la foto en un servicio de storage
      stage VARCHAR(50) NOT NULL CHECK(stage IN ('antes', 'despues')),
      taken_at TIMESTAMPTZ NOT NULL
    );
  