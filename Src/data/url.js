export const makeApiRequest = async query => {
  try {
    const response = await fetch(
      'http://wbjssk.emri.in:7777/wbit/api/wbemri.php',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      },
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error making API request:', error);
    throw error;
  }
};
