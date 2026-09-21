# Research
- Decision: Next App Router ISR + fetch server-side. Rationale: HTML y actualización sin nuevo deploy. Alternative: export estático requeriría rebuild en cada publicación.
- Decision: Express y PostgreSQL/Prisma reales. Rationale: stack solicitado y relaciones categoría/etiquetas. Alternative: archivos locales no cumplen persistencia de producción.
- Decision: editor propietario, cookie firmada y API privada. Rationale: flujo sencillo sin gestionar múltiples usuarios. Alternative: CMS externo añadiría otra cuenta y proveedor.
- Decision: Markdown seguro y cargas WebP. Rationale: edición flexible sin ejecutar HTML o código arbitrario. Alternative: MDX de usuarios sería ejecución de código.
- Decision: slugs publicados inmutables, retirar a borrador. Rationale: preservar URL y evitar borrado accidental.
- Decision: no relato personal. Rationale: instrucción explícita más reciente; familiares se declaran conforme a verdad y formulario, sin negar su existencia por no hablarles.
- Dependencies: dominio/proveedor, CMP/AdSense y correo dependen de configuración posterior. No bloquean desarrollo local.
- Security maintenance: actualizar Sharp a >=0.35.4; revisar deepmerge-ts transitivo de Prisma y validar compatibilidad del parche.
