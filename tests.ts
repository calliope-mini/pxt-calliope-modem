// this test runs on the device, connect and it will send the output on serial
// after everything is done
// run pxt test & copy build/binary.hex to MINI drive

// log AT commands to USB console
const DEBUG_AT = true;

//% shim=pxtrt::panic
function panic(code2: number): void {
}

function assert(msg: string, cond: boolean) {
    if (!cond) {
        modem.log("ASSERT:", msg + " failed");
        panic(45);
    } else {
        modem.log("TEST:", msg + ": OK");
    }
}

console.log("TEST START");

// test modem functionality
modem.enableDebug(DEBUG_AT);

// initialize module
modem.init(SerialPin.C17, SerialPin.C16, BaudRate.BaudRate9600);
// some modems have quirks:
modem.setATPrefix("\rAT");

assert("modem AT -> OK", modem.expectOK(""));
assert("modem AT+TRASH -> ERROR", !modem.expectOK("+TRASH"));


serial.resetSerial();
console.log("TEST FINISHED OK");
