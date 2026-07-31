# Club Digital Pro - Documentación de Endpoints Mobile API

La presente documentación detalla los endpoints expuestos para consumo exclusivo desde aplicaciones móviles. La arquitectura está diseñada para ser completamente Multi-Tenant y asegura el aislamiento de la información por club.

## Autenticación

- **POST /api/auth/login**
  - **Descripción**: Autentica a un usuario y retorna un token JWT + Refresh Token.
  - **Headers**:
    - `X-Tenant-Id`: ID único del club al que el socio pertenece.
  - **Payload**: `{ email, password }`
  - **Response**: `{ success: true, data: { accessToken, refreshToken, expiresIn, user: MobileUser } }`

- **POST /api/auth/refresh**
  - **Descripción**: Refresca el token JWT cuando ha caducado, validando roles vigentes y estado de cuenta.

- **GET /api/mobile/profile**
  - **Descripción**: Retorna la información completa del `MobileUser` autenticado y validado, incluyendo sus `MobilePermission` asociados a su rol (`SOCIO`, `FAMILIA`, `JUGADOR`, `ENTRENADOR`, `ADMIN`).

## Carnet de Socio & Identidad

- **GET /api/mobile/card**
  - **Descripción**: Retorna los datos del carnet digital (`DigitalCard`), con el token seguro de QR para presentar en controles de acceso o molinetes.
  - **Nota**: El código QR es dinámico y valida morosidad.

## Cuotas Sociales y Pagos

- **GET /api/mobile/payments**
  - **Descripción**: Devuelve el estado de cuenta y últimos pagos aprobados del socio. Consumido para el historial de transacciones.
  - **Filtros**: Permite query parameters por mes o estado.

- **POST /api/tenant/finance/mercadopago/preference**
  - **Descripción**: Permite simular o generar un Preference ID de Mercado Pago para concretar el cobro online desde la app. Requiere token de acceso del club.

## Club TV & Streaming

- **GET /api/mobile/tv**
  - **Descripción**: Lista canales, transmisiones en vivo (`TvStream`), y contenidos on-demand del club, consumiendo desde la base `MediaItem` compartida con el dashboard.

## Noticias y Media Center

- **GET /api/mobile/news**
  - **Descripción**: Consume el listado de noticias (`MediaContent`) del club, distinguiendo aquellas redactadas manualmente de las generadas por IA.
  - **Formatos compatibles**: Renderización en componentes UI y soporte de Deep Links.

## Agenda & Gestión Deportiva

- **GET /api/mobile/calendar**
  - **Descripción**: Brinda acceso consolidado a eventos del calendario del socio:
    - Entrenamientos.
    - Partidos (`SportsMatch`).
    - Eventos institucionales.

## Consideraciones de Seguridad y Roles

- **Doble barrera Middleware**: Todos los endpoints `/api/mobile/*` implementan `tenantMiddleware` y `authenticateJwt`. Esto asegura que un socio de un club no pueda interactuar ni ver datos de otro club.
- **Roles & RBAC**: El payload del JWT decodificado en `req.user` provee el ID de tenant exacto del usuario y su rol de sistema para filtrado.
- **Expo SecureStore**: La App Mobile (Fase 12) está pensada para persistir credenciales de forma cifrada mediante `expo-secure-store`, reteniendo `X-Tenant-Id` y `accessToken`.
