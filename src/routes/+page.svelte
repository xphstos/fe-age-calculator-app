<script lang="ts">
	import Calculator from '../components/Calculator.svelte';
	import '../app.css';
</script>

<svelte:head>
	<title>Frontend Mentor | Age calculator app</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,700;1,400;1,800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<main class="grid lg:place-items-center min-h-dvh px-4 py-20">
	<Calculator />
</main>
