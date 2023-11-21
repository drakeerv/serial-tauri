#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;

pub fn run() {
    tauri::Builder::default()
        .manage(commands::SerialPortState::default())
        .invoke_handler(tauri::generate_handler![
            commands::list_ports,
            commands::open_port,
            commands::close_port,
            commands::write_data,
            commands::read_data
        ])
        .run(tauri::generate_context!())
        .expect("Error while running tauri application");
}
