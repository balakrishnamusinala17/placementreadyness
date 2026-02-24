document.addEventListener("DOMContentLoaded", () => {
  const promptArea = document.querySelector("[data-kn-prompt]");
  const copyPromptButton = document.querySelector("[data-kn-copy-prompt]");
  const outcomeButtons = document.querySelectorAll("[data-kn-outcome]");
  const outcomeMessage = document.querySelector("[data-kn-outcome-message]");
  const statusBadge = document.querySelector("[data-kn-status-badge]");

  const proofCheckboxes = document.querySelectorAll("[data-kn-proof-checkbox]");

  if (copyPromptButton && promptArea) {
    copyPromptButton.addEventListener("click", async () => {
      const value = promptArea.value || "";
      try {
        await navigator.clipboard.writeText(value);
        copyPromptButton.textContent = "Copied";
        setTimeout(() => {
          copyPromptButton.textContent = "Copy prompt";
        }, 1500);
      } catch {
        copyPromptButton.textContent = "Copy failed";
        setTimeout(() => {
          copyPromptButton.textContent = "Copy prompt";
        }, 1500);
      }
    });
  }

  if (outcomeButtons.length && outcomeMessage && statusBadge) {
    outcomeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const outcome = button.getAttribute("data-kn-outcome");

        if (outcome === "success") {
          outcomeMessage.textContent =
            "Record what made this step successful so it can be repeated.";
          statusBadge.textContent = "In Progress";
          statusBadge.classList.remove(
            "kn-badge--status-idle",
            "kn-badge--status-shipped",
          );
          statusBadge.classList.add("kn-badge--status-progress");
        }

        if (outcome === "error") {
          outcomeMessage.textContent =
            "Note what did not work and the next small adjustment you plan to try.";
          statusBadge.textContent = "Not Started";
          statusBadge.classList.remove(
            "kn-badge--status-progress",
            "kn-badge--status-shipped",
          );
          statusBadge.classList.add("kn-badge--status-idle");
        }

        if (outcome === "evidence") {
          outcomeMessage.textContent =
            "Attach or reference evidence here so future reviewers can trust this step.";
        }
      });
    });
  }

  if (proofCheckboxes.length) {
    proofCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const key = checkbox.getAttribute("data-kn-proof-checkbox");
        if (!key) return;

        const input = document.querySelector(
          `[data-kn-proof-input="${key}"]`,
        );

        if (!input) return;

        const value = input.value.trim();

        if (checkbox.checked && !value) {
          checkbox.checked = false;
          input.focus();
        }
      });
    });
  }
});

