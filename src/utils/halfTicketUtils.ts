export interface HalfTicketInfo {
    isEligible: boolean;
    age?: number;
    cpf?: string;
    institution?: string;
    institutionVerification: boolean;
    documentUrl?: string;
    status: 'pendente' | 'aprovado' | 'rejeitado';
}

/**
 * Verifica se um usuário é elegível para meia-entrada
 * Critérios:
 * 1. Ser menor de 18 anos
 * 2. OU ter vínculo com instituição de ensino (confirmado pelo usuário)
 */
export function checkHalfTicketEligibility(info: Partial<HalfTicketInfo>): boolean {
    // Menor de 18 anos
    if (info.age !== undefined && info.age < 18) {
        return true;
    }

    // Tem instituição vinculada e confirmou
    if (info.institution && info.institutionVerification) {
        return true;
    }

    return false;
}

/**
 * Calcula o preço do ingresso considerando meia-entrada
 */
export function calculateTicketPrice(basePrice: number, hasHalfTicket: boolean): number {
    if (hasHalfTicket) {
        return basePrice / 2;
    }
    return basePrice;
}

/**
 * Calcula o total de ingressos com desconto de meia-entrada
 */
export function calculateSeatsTotal(
    seatsCount: number,
    baseTicketPrice: number,
    hasHalfTicket: boolean
): number {
    const ticketPrice = calculateTicketPrice(baseTicketPrice, hasHalfTicket);
    return seatsCount * ticketPrice;
}

/**
 * Formata status de meia-entrada para exibição
 */
export function formatHalfTicketStatus(status: string): string {
    const statusMap: Record<string, string> = {
        'pendente': 'Aguardando Validação',
        'aprovado': 'Aprovado',
        'rejeitado': 'Rejeitado',
    };
    return statusMap[status] || 'Desconhecido';
}

/**
 * Obtém cor de status para exibição visual
 */
export function getStatusColor(status: string): string {
    const colorMap: Record<string, string> = {
        'pendente': 'yellow',
        'aprovado': 'green',
        'rejeitado': 'red',
    };
    return colorMap[status] || 'gray';
}
