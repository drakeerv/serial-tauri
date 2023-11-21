#[tauri::command]
pub fn list_ports() -> Result<Vec<String>, String> {
    let ports = serialport::available_ports().map_err(|e| e.to_string())?;
    let port_names: Vec<String> = ports
        .iter()
        .map(|port| port.port_name.clone())
        .collect::<Vec<String>>();
    Ok(port_names)
}

#[derive(Default)]
pub struct SerialPortState {
    port: std::sync::Mutex<Option<Box<dyn serialport::SerialPort>>>,
}

#[tauri::command]
pub fn open_port(
    state: tauri::State<'_, SerialPortState>,
    port_name: String,
    baud_rate: u32,
) -> Result<(), String> {
    let mut port = serialport::new(port_name, baud_rate)
        .timeout(std::time::Duration::from_millis(10))
        .open()
        .map_err(|e| e.to_string())?;
    port.write_data_terminal_ready(true)
        .map_err(|e| e.to_string())?;
    *state.port.lock().unwrap() = Some(port);
    Ok(())
}

#[tauri::command]
pub fn close_port(state: tauri::State<'_, SerialPortState>) -> Result<(), String> {
    let mut port = state.port.lock().unwrap();
    if let Some(port) = port.as_mut() {
        port.write_data_terminal_ready(false)
            .map_err(|e| e.to_string())?;
    }
    *port = None;
    Ok(())
}

#[tauri::command]
pub fn write_data(state: tauri::State<'_, SerialPortState>, data: String) -> Result<(), String> {
    let mut port = state.port.lock().unwrap();
    if let Some(port) = port.as_mut() {
        port.write(data.as_bytes()).map_err(|e| e.to_string())?;
    }
    Ok(())
}

#[tauri::command]
pub fn read_data(state: tauri::State<'_, SerialPortState>) -> Result<String, String> {
    let mut port = state.port.lock().unwrap();
    if let Some(port) = port.as_mut() {
        let mut buffer: Vec<u8> = vec![0; 1024];
        let bytes_read = port
            .read(buffer.as_mut_slice())
            .map_err(|e| e.to_string())?;
        buffer.truncate(bytes_read);
        let string = String::from_utf8(buffer).map_err(|e| e.to_string())?;
        Ok(string)
    } else {
        Ok("".into())
    }
}
