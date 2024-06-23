<script lang="ts">
	import { cn } from '$lib/cn';
	import { createEventDispatcher } from 'svelte';

	export let label: string;
	export let value: string | number | null;
	export let error: string | null;
	export let placeholder: string = '';
	export let min: string | number | null = null;

	const dispatch = createEventDispatcher();

	const handleInput = (event: Event) => {
		const target = event.target as HTMLInputElement;
		value = Number(target.value);
		dispatch('input', value);
	};
</script>

<label>
	<div
		class={cn('text-label text-neutral-500 mb-2', {
			'text-error text-label-error': error
		})}
	>
		{label}
	</div>
	<input
		class={cn(
			'min-h-[fluid(3.375rem,4.5rem)] min-w-1 w-full rounded-input px-[fluid(1rem,1.5rem)] py-[fluid(.75rem,1rem)] ring-1 ring-neutral-100 placeholder:text-neutral-500 appearance-none, focus:ring-accent focus-within:ring-accent hover:ring-accent transition-all outline-none',
			{
				'ring-error': error
			}
		)}
		type="number"
		bind:value
		on:input={handleInput}
		{min}
		{placeholder}
	/>
	{#if error}
		<div class="text-error text-label-error italic mt-2">{error}</div>
	{/if}
</label>
