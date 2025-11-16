export function generateItems(numbers: number[]): string[] {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const items: string[] = [];

    numbers.forEach((count, index) => {
        const prefix = letters[index];
        for (let i = 1; i <= count; i++) {
            items.push(`${prefix}${i}`);
        }
    });

    return items;
}


export function generateValidCombinations(items: string[], length: number): string[][] {
    const result: string[][] = [];

    const backtrack = (start: number, path: string[]) => {
        if (path.length === length) {
            result.push([...path]);
            return;
        }

        for (let i = start; i < items.length; i++) {
            const item = items[i];
            if (!path.some(p => p[0] === item[0])) {
                path.push(item);
                backtrack(i + 1, path);
                path.pop();
            }
        }
    };

    backtrack(0, []);
    return result;
}
