// Main JavaScript file for Product Supplier Management with Authentication

document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });

    // Add hover effects to cards
    const cardHovers = document.querySelectorAll('.card');
    cardHovers.forEach(card => {
        card.classList.add('card-hover');
    });

    // Form validation feedback
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
            }
        });
    });

    // Auto-hide alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        if (!alert.classList.contains('alert-danger')) {
            setTimeout(() => {
                alert.style.transition = 'opacity 0.5s';
                alert.style.opacity = '0';
                setTimeout(() => {
                    alert.remove();
                }, 500);
            }, 5000);
        }
    });

    // Confirm delete actions
    const deleteLinks = document.querySelectorAll('a[href*="/delete"]');
    deleteLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
                e.preventDefault();
            }
        });
    });

    // Format currency inputs
    const priceInputs = document.querySelectorAll('input[name="price"]');
    priceInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const value = parseFloat(this.value);
            if (!isNaN(value)) {
                this.value = value.toFixed(2);
            }
        });
    });

    // Format phone inputs
    const phoneInputs = document.querySelectorAll('input[name="phone"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Remove any non-numeric characters except +, -, (, ), and spaces
            this.value = this.value.replace(/[^0-9+\-()\s]/g, '');
        });
    });

    // Real-time search functionality
    const searchInput = document.getElementById('search');
    const supplierSelect = document.getElementById('supplier');
    
    if (searchInput || supplierSelect) {
        let searchTimeout;
        
        function performSearch() {
            const searchTerm = searchInput ? searchInput.value : '';
            const supplierId = supplierSelect ? supplierSelect.value : '';
            
            // Clear previous timeout
            clearTimeout(searchTimeout);
            
            // Set new timeout for debounced search
            searchTimeout = setTimeout(() => {
                if (searchTerm.length >= 2 || supplierId) {
                    fetchSearchResults(searchTerm, supplierId);
                }
            }, 300);
        }
        
        if (searchInput) {
            searchInput.addEventListener('input', performSearch);
        }
        
        if (supplierSelect) {
            supplierSelect.addEventListener('change', performSearch);
        }
    }

    // Password confirmation validation
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    if (passwordInput && confirmPasswordInput) {
        function validatePasswordMatch() {
            if (confirmPasswordInput.value && passwordInput.value !== confirmPasswordInput.value) {
                confirmPasswordInput.setCustomValidity('Passwords do not match');
            } else {
                confirmPasswordInput.setCustomValidity('');
            }
        }
        
        passwordInput.addEventListener('input', validatePasswordMatch);
        confirmPasswordInput.addEventListener('input', validatePasswordMatch);
    }

    // Tooltip initialization (if Bootstrap tooltips are used)
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Popover initialization (if Bootstrap popovers are used)
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
});

// AJAX search function
async function fetchSearchResults(searchTerm, supplierId) {
    try {
        const params = new URLSearchParams();
        if (searchTerm) params.append('q', searchTerm);
        if (supplierId) params.append('supplier', supplierId);
        
        const response = await fetch(`/api/search?${params}`);
        const data = await response.json();
        
        if (data.success) {
            updateSearchResults(data.products);
        }
    } catch (error) {
        console.error('Search error:', error);
    }
}

// Update search results (for AJAX search)
function updateSearchResults(products) {
    const tbody = document.querySelector('tbody');
    if (!tbody) return;
    
    if (products.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">No products found</td></tr>';
        return;
    }
    
    tbody.innerHTML = products.map(product => `
        <tr>
            <td><strong>${product.name}</strong></td>
            <td><span class="badge bg-success">$${product.price}</span></td>
            <td><span class="badge bg-info">${product.quantity}</span></td>
            <td><span class="badge bg-warning">$${(product.price * product.quantity).toFixed(2)}</span></td>
            <td><a href="/suppliers/${product.supplier._id}" class="text-decoration-none"><i class="bi bi-building"></i> ${product.supplier.name}</a></td>
            ${window.user && window.user.isAdmin ? `
                <td>
                    <div class="btn-group btn-group-sm" role="group">
                        <a href="/products/${product._id}" class="btn btn-outline-primary"><i class="bi bi-eye"></i></a>
                        <a href="/products/${product._id}/update" class="btn btn-outline-warning"><i class="bi bi-pencil"></i></a>
                        <a href="/products/${product._id}/delete" class="btn btn-outline-danger"><i class="bi bi-trash"></i></a>
                    </div>
                </td>
            ` : ''}
        </tr>
    `).join('');
}

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}

// Export functions for use in other scripts
window.ProductSupplierApp = {
    formatCurrency,
    formatDate,
    fetchSearchResults,
    updateSearchResults
};