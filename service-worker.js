// ...existing code...
async function handleFetch(event) {
  const response = await fetch(event.request);
  // Clone the response before using it
  const responseToCache = response.clone();
  
  // Use the cloned response for caching
  if (shouldCache(event.request)) {
    const cache = await caches.open(CACHE_NAME);
    await cache.put(event.request, responseToCache);
  }
  
  // Return the original response
  return response;
}
// ...existing code...
