-- Corrige a posição da Luna: a coordenada original ficava no centro de
-- São Paulo (em terra). Só altera se ainda estiver com o valor antigo.
UPDATE "MarineAnimal"
SET "latitude" = -24.1,
    "longitude" = -45.5,
    "updatedAt" = NOW()
WHERE "name" = 'Luna'
  AND "species" = 'Tartaruga-Verde'
  AND "latitude" = -23.5505
  AND "longitude" = -46.6333;