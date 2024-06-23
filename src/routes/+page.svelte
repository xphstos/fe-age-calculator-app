<script lang="ts">
	import Calculator from '../components/Calculator.svelte';
	import '../app.css';
</script>

<svelte:head>
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<title>Frontend Mentor | Age calculator app</title>
	<meta
		name="description"
		content="This is a solution to the Age calculator app challenge on Frontend Mentor"
	/>
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
