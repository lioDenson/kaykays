// Runs live while typing
export function sanitizeOnChange(rawInput: string): { raw: string; numeric: number } {
    let raw = rawInput;

    // if user types ".5" -> convert to "0.5"
    if (raw.startsWith('.')) raw = '0' + raw;

    // allow only digits and one dot
    raw = raw.replace(/[^0-9.]/g, '');
    const firstDot = raw.indexOf('.');
    if (firstDot !== -1) {
        raw = raw.slice(0, firstDot + 1) + raw.slice(firstDot + 1).replace(/\./g, '');
    }

    // remove leading zeros unless "0."
    if (raw.length > 1 && raw[0] === '0' && raw[1] !== '.') {
        raw = raw.replace(/^0+/, '');
        if (raw === '') raw = '0';
    }

    // numeric value (0 if empty or just ".")
    const numeric = raw === '' || raw === '.' ? 0 : parseFloat(raw) || 0;

    return { raw, numeric };
}

// Runs once when input loses focus
export function sanitizeOnBlur(rawInput: string): { raw: string; numeric: number } {
    // remove trailing dot like "0." -> "0"
    const normalized = rawInput.replace(/\.$/, '') || '0';
    const numeric = parseFloat(normalized) || 0;

    return { raw: normalized, numeric };
}
