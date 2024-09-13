// Initial progress value (set manually in the code)
const initialProgress = 20; // Set your desired initial progress value here

const loadingBar = document.getElementById('loadingBar');
const loadingPercentage = document.getElementById('loadingPercentage');

/**
 * Set the progress percentage and automatically update the loading bar
 * @param {number} newPercentage - The new percentage to set (0 to 100)
 */
function setProgress(newPercentage) {
    const progress = Math.min(100, Math.max(0, newPercentage));
    loadingBar.style.width = progress + '%';
    loadingPercentage.textContent = progress + '%';
}

// Set the progress to the initial value
setProgress(initialProgress);
document.addEventListener('DOMContentLoaded', () => {
    // Function to calculate the total amount from the table
    function calculateTotal() {
        const table = document.getElementById('transactionsTable');
        const rows = table.querySelectorAll('tbody tr');
        let total = 0;

        rows.forEach(row => {
            const amountCell = row.querySelector('td:last-child');
            const amountText = amountCell.textContent.trim();
            const amount = parseFloat(amountText.replace(/[^0-9.-]+/g, ''));
            if (!isNaN(amount)) {
                total += amount;
            }
        });

        // Display the total amount
        document.getElementById('totalAmountValue').textContent = total.toFixed(2);
    }

    // Calculate and display the total amount when the page loads
    calculateTotal();
});
document.addEventListener('DOMContentLoaded', () => {
    // Function to format the amount with the rupee sign and commas
    function formatAmount(amount) {
        // Convert amount to a string with commas
        const formattedAmount = amount.toLocaleString('en-IN', { maximumFractionDigits: 2 });
        return `₹ ${formattedAmount}`;
    }

    // Function to calculate the total amount from the table
    function calculateTotal() {
        const table = document.getElementById('transactionsTable');
        const rows = table.querySelectorAll('tbody tr');
        let total = 0;

        rows.forEach(row => {
            const amountCell = row.querySelector('td:last-child');
            const amountText = amountCell.textContent.trim();
            const amount = parseFloat(amountText.replace(/[^0-9.-]+/g, ''));
            if (!isNaN(amount)) {
                total += amount;
            }
        });

        // Display the total amount in the next column
        displayTotal(total);
    }

    // Function to display the total amount in the next column
    function displayTotal(total) {
        const tableBody = document.querySelector('#transactionsTable tbody');
        const lastRow = tableBody.querySelector('tr:last-child');
        const lastRowCells = lastRow.querySelectorAll('td');

        // Create a new row for the total amount
        const totalRow = document.createElement('tr');
        totalRow.classList.add('total-row');

        if (lastRowCells.length > 1) {
            totalRow.innerHTML = `
                <td colspan="${lastRowCells.length - 1}"><strong>Total Amount:</strong></td>
                <td><strong>${formatAmount(total)}</strong></td>
            `;
        } else {
            totalRow.innerHTML = `
                <td colspan="${lastRowCells.length}"><strong>Total Amount:</strong> ${formatAmount(total)}</td>
            `;
        }

        // Clear any existing total row
        const existingTotalRow = tableBody.querySelector('tr.total-row');
        if (existingTotalRow) {
            existingTotalRow.remove();
        }

        // Add the total row to the table body
        tableBody.appendChild(totalRow);
    }

    // Format existing amounts in the table
    function formatExistingAmounts() {
        const table = document.getElementById('transactionsTable');
        const rows = table.querySelectorAll('tbody tr');

        rows.forEach(row => {
            const amountCell = row.querySelector('td:last-child');
            const amountText = amountCell.textContent.trim();
            const amount = parseFloat(amountText.replace(/[^0-9.-]+/g, ''));
            if (!isNaN(amount)) {
                amountCell.textContent = formatAmount(amount);
            }
        });
    }

    // Calculate and display the total amount when the page loads
    calculateTotal();
    formatExistingAmounts();
});
