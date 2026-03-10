<script setup>
// Inicjalizacja klienta Supabase
const client = useSupabaseClient()

// Miejsce na Twoją logikę pobierania danych, paginację itp.
// Powodzenia! 🚀
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans text-gray-800">
    <div class="max-w-7xl mx-auto">
      
      <!-- Nagłówek powitalny (śmiało, możesz go usunąć lub zmodyfikować!) -->
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Lista Zamówień</h1>
        <p class="text-gray-500 mt-2">To jest Twoja strona startowa. Powodzenia w zadaniu! 🚀</p>
      </header>

      <!-- Główne miejsce na Twoją aplikację -->
      <main>
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center min-h-[400px]">
          <p class="text-gray-400 text-lg">
            Miejsce na Twoją tabelę / kafelki z zamówieniami...
          </p>
        </div>
      </main>

    </div>
  </div>
</template>