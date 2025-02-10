document.getElementById("fetchLogs").addEventListener("click", fetchLogs);
document.getElementById("clearLogs").addEventListener("click", clearLogs);
document.getElementById("searchLogs").addEventListener("input", filterLogs);

async function fetchLogs() {
  const token = document.getElementById("authToken").value;
  const tableBody = document.querySelector("#logTable tbody");

  try {
    const res = await fetch("/api/admin/logs", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Unauthorized or server error");

    const logs = await res.json();
    tableBody.innerHTML = "";

    logs.forEach((log) => {
      const logDetails = parseLog(log.line);
      if (logDetails) {
        const row = `
          <tr class="${logDetails.level.toLowerCase()}">
            <td>${logDetails.date}</td>
            <td>${logDetails.level}</td>
            <td>${logDetails.method}</td>
            <td>${logDetails.url}</td>
            <td>${logDetails.status}</td>
            <td>${logDetails.responseTime}</td>
            <td>${logDetails.message}</td>
          </tr>
        `;
        tableBody.innerHTML += row;
      }
    });
  } catch (error) {
    tableBody.innerHTML = `<tr><td colspan="7">❌ Error: ${error.message}</td></tr>`;
  }
}

async function clearLogs() {
  const token = document.getElementById("authToken").value;
  const tableBody = document.querySelector("#logTable tbody");

  try {
    const res = await fetch("/api/admin/logs", {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Unauthorized or server error");

    const result = await res.json();
    tableBody.innerHTML = `<tr><td colspan="7">✅ ${result.message}</td></tr>`;
  } catch (error) {
    tableBody.innerHTML = `<tr><td colspan="7">❌ Error: ${error.message}</td></tr>`;
  }
}

function parseLog(logLine) {
  const regex =
    /(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) \[(\w+)\]: URL: (.*?) \| METHOD: (.*?) \| STATUS: (.*?) \| RESPONSE TIME: (.*?) \| MESSAGE: (.*)/;
  const match = logLine.match(regex);

  if (match) {
    return {
      date: match[1],
      level: match[2],
      url: match[3],
      method: match[4],
      status: match[5],
      responseTime: match[6],
      message: match[7],
    };
  }

  // Handle cases like server startup logs
  const altRegex = /(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) \[(\w+)\]: (.*)/;
  const altMatch = logLine.match(altRegex);

  if (altMatch) {
    return {
      date: altMatch[1],
      level: altMatch[2],
      url: "-",
      method: "-",
      status: "-",
      responseTime: "-",
      message: altMatch[3],
    };
  }

  return null;
}

function filterLogs(event) {
  const searchTerm = event.target.value.toLowerCase();
  const rows = document.querySelectorAll("#logTable tbody tr");

  rows.forEach((row) => {
    const rowText = row.innerText.toLowerCase();
    row.style.display = rowText.includes(searchTerm) ? "" : "none";
  });
}
