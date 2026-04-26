-- Migration: 20260426_3d_assets
-- Description: Schema for Section A1 3D Product Visualiser

-- 3D Assets table for storing GLB variants and processing status
create table if not exists product_3d_assets (
  id              uuid primary key default gen_random_uuid(),
  product_id      uuid references products(id) on delete cascade,
  status          text default 'processing' check (status in ('processing', 'ready', 'error')),
  glb_high        text,
  glb_mid         text,
  glb_low         text,
  draco_version   text,
  poly_count_high int,
  poly_count_mid  int,
  manifest        jsonb,
  upload_error    text,
  uploaded_at     timestamptz default now(),
  processed_at    timestamptz
);

-- Configurator texture sets for runtime material swapping
create table if not exists configurator_texture_sets (
  id              uuid primary key default gen_random_uuid(),
  option_id       uuid references configurator_options(id) on delete cascade,
  albedo_url      text,   -- KTX2
  normal_url      text,
  mr_url          text,   -- metallic-roughness combined
  emissive_url    text,   -- for lighting options
  emissive_hex    text,
  processed_at    timestamptz
);

-- RLS Policies
alter table product_3d_assets enable row level security;
alter table configurator_texture_sets enable row level security;

-- Public can read ready assets
create policy "Public can view ready 3D assets"
  on product_3d_assets for select
  using (status = 'ready');

create policy "Public can view texture sets"
  on configurator_texture_sets for select
  using (true);

-- Admins can do everything
create policy "Admins can manage 3D assets"
  on product_3d_assets for all
  using (auth.jwt() ->> 'role' = 'admin');

create policy "Admins can manage texture sets"
  on configurator_texture_sets for all
  using (auth.jwt() ->> 'role' = 'admin');
